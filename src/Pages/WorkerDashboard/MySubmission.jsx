import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hook/useAuth";

const MySubmission = () => {
  const { user } = useAuth();

  // Fetch submissions
  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submission", user?.email],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/submissions/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <h2 className="text-center text-xl font-semibold text-gray-600">Loading...</h2>;
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
            {/* Map through submissions */}
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{submission.task_title}</td>
                <td className="py-2 px-4">{submission.buyer_name}</td>
                <td className="py-2 px-4">${submission.payable_amount}</td>
                <td className="py-2 px-4 truncate max-w-xs" title={submission.submission_details}>
                  {submission.submission_details}
                </td>
                <td className="py-2 px-4">{new Date(submission.current_date).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      submission.status === "pending"
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
    </div>
  );
};

export default MySubmission;
