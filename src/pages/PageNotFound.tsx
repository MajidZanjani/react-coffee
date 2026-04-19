export default function PageNotFound() {
  return (
    <div className="flex flex-col justify-self-center pt-10 text-center text-6xl font-bold text-text-accent gap-5">
      <span className="text-9xl text-red-600">404!</span>
      <span>There's no such page available.</span>
      <span>Please navigate to Home or menu page.</span>
    </div>
  );
}
