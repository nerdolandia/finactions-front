import ProtectedRoute from "@/lib/components/ProtectedRoute";

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <div>Esta é uma página protegida.</div>
    </ProtectedRoute>
  );
};

export default ProtectedPage;