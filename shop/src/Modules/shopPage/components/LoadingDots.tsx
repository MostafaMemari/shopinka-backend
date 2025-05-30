export default function LoadingDots() {
  return (
    <div className="flex justify-center py-4">
      <span className="inline-block w-2 h-2 mx-1 rounded-full animate-bounce [animation-delay:-0.32s] bg-primary"></span>
      <span className="inline-block w-2 h-2 mx-1 rounded-full animate-bounce [animation-delay:-0.16s] bg-primary"></span>
      <span className="inline-block w-2 h-2 mx-1 rounded-full animate-bounce bg-primary"></span>
    </div>
  );
}
