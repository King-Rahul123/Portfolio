export default function Contact() {
  return (
    <section className="my-32">
      <h2 className="text-hacker text-xl mb-4"> contact</h2>
      <p className="text-gray-400 mb-6">
        Want to work together? Reach out.
      </p>

      <div className="flex gap-6 text-hacker">
        <a href="#" className="hover:underline">GitHub</a>
        <a href="#" className="hover:underline">LinkedIn</a>
        <a href="#" className="hover:underline">Email</a>
      </div>
    </section>
  );
}
