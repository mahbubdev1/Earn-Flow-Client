import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hook/useAuth";
import { useState } from "react";
import Loading from "../../Components/ErrorLoading/Loading";

const MySubmission = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch submissions
  const { data: submissionResponse = {}, isLoading } = useQuery({
    queryKey: ["submission", user?.email, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/submissions/${user?.email}?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const submissions = submissionResponse?.submissions || [];
  const totalSubmissions = submissionResponse?.total || 0;
  const totalPages = Math.ceil(totalSubmissions / itemsPerPage);



  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="w-full mx-auto px-4 py-8 z-0">
      <h1 className="text-2xl font-bold text-center mb-6">My Submissions</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          {/* Table Header */}
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Task Title</th>
              <th className="py-2 px-4">Buyer Name</th>
              <th className="py-2 px-4">Payable Amount</th>
              <th className="py-2 px-4">Submission Details</th>
              <th className="py-2 px-4">Current Date</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {submissions?.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{submission?.task_title}</td>
                <td className="py-2 px-4">{submission?.buyer_name}</td>
                <td className="py-2 px-4">${submission?.payable_amount}</td>
                <td className="py-2 px-4 truncate max-w-xs" title={submission?.submission_details}>
                  {submission?.submission_details}
                </td>
                <td className="py-2 px-4">{new Date(submission?.current_date).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${submission.status === "pending"
                      ? "bg-yellow-500"
                      : submission.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                      }`}
                  >
                    {submission.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"} `}
        >
          Previous
        </button>
        <span className="mx-2 text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"} `}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MySubmission;