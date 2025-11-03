import { Dispatch } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface PaginationProps {
    total: number;
    page: number;
    limit: number;
    setPage: Dispatch<React.SetStateAction<number>>;
}

const PaginationComponent = ({
    total,
    page,
    limit,
    setPage,
}: PaginationProps) => {
    const pageNum = Math.ceil(total / limit);

    return (
        <section className="mt-3">
            <div className="flex justify-center gap-x-4">
                <button
                    name="before page"
                    onClick={() => {
                        setPage(page - 1);
                    }}
                    disabled={page === 1}
                >
                    <SlArrowLeft />
                </button>

                {
                    Array(pageNum)
                        .fill(0)
                        .map((_, i) => (
                            <button
                                name={`${i + 1} page button`}
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                aria-current={page === i + 1 && 'page'}
                                className={
                                    page === i + 1
                                        ? "text-main-color"
                                        : "text-sub-font"
                                }
                            >
                                {i + 1}
                            </button>
                        ))
                }

                <button
                    name="next page"
                    onClick={() => {
                        setPage(page + 1);
                    }}
                    disabled={page === pageNum}
                >
                    <SlArrowRight />
                </button>
            </div>
        </section>
    );
};

export default PaginationComponent;