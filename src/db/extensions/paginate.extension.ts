import { Prisma } from "@prisma/client";
import { logger } from "../../config";
import { z } from "zod";

// Define a clear interface for pagination options
export interface PaginationOptions {
  /**
   * The page number to retrieve.
   * @default 1
   */
  page?: number | string;
  /**
   * The number of items per page.
   * @default 12
   */
  pageSize?: number | string;
}

// Define a clear interface for the pagination metadata
export interface PaginationMeta {
  /** The current page number. */
  currentPage: number;
  /** The number of items per page. */
  pageSize: number;
  /** The total number of pages. */
  totalPages: number;
  /** The total number of items across all pages. */
  totalCount: number;
}

// Define a clear interface for the paginated result
export interface PaginatedResult<T> {
  /** The data for the current page. */
  data: T[];
  /** The pagination metadata. */
  meta: PaginationMeta;
}

export const paginateExtension = Prisma.defineExtension({
  model: {
    $allModels: {
      /**
       * Paginates the query results for any model.
       * @template T The model type (e.g., User, Post).
       * @template A The arguments type for the findMany operation.
       * @param this The Prisma model context.
       * @param args The arguments for the findMany operation, including optional pagination options.
       * @returns A Promise resolving to an object containing the paginated data and metadata.
       */
      async paginate<T, A>(
        this: T,
        args?: Prisma.Exact<A, Prisma.Args<T, "findMany">> & {
          pagination?: PaginationOptions;
        }
      ): Promise<PaginatedResult<Prisma.Result<T, A, "findMany">[number]>> {
        // Return PaginatedResult<ModelType>
        // Type assertion for context (`this`) to access model methods
        const context = Prisma.getExtensionContext(this);

        // Destructure arguments, providing default empty object if args is undefined
        const { pagination, ...operationArgs } = (args ?? {}) as any;

        // --- Input Validation and Defaulting ---

        // Validate and parse the page number, defaulting to 1
        let currentPage = 1;
        if (pagination?.page) {
          const pageNum = parseInt(pagination.page, 10);
          // Ensure page is a positive integer
          if (!isNaN(pageNum) && Number.isInteger(pageNum) && pageNum > 0) {
            currentPage = pageNum;
          } else {
            logger.warn(
              `Invalid page number "${pagination.page}" provided. Defaulting to 1.`
            );
          }
        }

        // Validate and parse the page size, defaulting to 12
        let pageSize = 12;
        if (pagination?.pageSize) {
          const pageSizeNum = Number(pagination.pageSize);
          // Ensure pageSize is a positive integer
          if (z.number().min(1).safeParse(pageSizeNum).success) {
            pageSize = pageSizeNum;
          } else {
            logger.warn(
              `Invalid page size "${pagination.pageSize}" provided. Defaulting to 12.`
            );
          }
        }

        // Calculate the number of records to skip
        const skip = (currentPage - 1) * pageSize;

        // --- Database Operations ---

        // Perform count and findMany operations in parallel for efficiency
        const [totalCount, data] = await Promise.all([
          // Count the total number of records matching the where clause
          (context as any).count({ where: operationArgs?.where }),
          // Retrieve the data for the current page
          (context as any).findMany({
            ...operationArgs,
            skip: skip,
            take: pageSize,
          }),
        ]);

        // --- Result Calculation ---

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalCount / pageSize);

        // --- Return Paginated Result ---
        return {
          data, // The records for the current page
          meta: {
            // Pagination metadata
            currentPage,
            pageSize,
            totalPages,
            totalCount,
          },
        };
      },
    },
  },
});
