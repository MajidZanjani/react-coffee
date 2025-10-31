export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-bg-light bg-footer m-5 rounded-2xl py-10"
    >
      <div className="container mx-auto px-6 md:px-10">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT COLUMN - Message & Socials */}
          <div className="flex flex-col items-start space-y-5">
            <h3 className="font-inter text-4xl text-text-dark">Message me</h3>
            <p className="text-text-dark text-xl max-w-sm">
              I’d love to hear from you! Whether you have a question, a project
              idea, or just want to connect — feel free to reach out anytime.
            </p>

            {/* Social Icons */}
            <div className="flex flex-row gap-5 pt-2">
              <a
                href="https://www.linkedin.com/in/majidzanjani/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-linkedin transition-all duration-300 ease-in-out hover:scale-125 "
              >
                <i className="fab fa-linkedin text-2xl">LinkedIn</i>
              </a>
              <a
                href="https://github.com/MajidZanjani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-github  transition-all duration-300 ease-in-out hover:scale-125"
              >
                <i className="fab fa-github text-2xl">GitHub</i>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN - Contact Details */}
          <div className="flex flex-col items-start space-y-4">
            <div>
              <h4 className="font-semibold text-text-dark">Email</h4>
              <a href="mailto:majidmmz1972@gmail.com">
                <i className="text-text-dark duration-300 ease-in-out hover:font-bold">
                  majidmmz1972@gmail.com
                </i>
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-text-dark">Phone</h4>
              <a href="tel:00995551100642">
                <i className="text-text-dark duration-300 ease-in-out hover:font-bold">
                  +995 551100642
                </i>
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-text-dark">Location</h4>
              <p className="text-text-dark">Tbilisi, Georgia</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-text-dark">
          <p>
            © {new Date().getFullYear()} Majid M. M. Zanjani. All rights
            reserved.
          </p>
          <p className="mt-3 md:mt-0">
            Designed & Built by{" "}
            <span className="text-text-accent font-semibold">
              Majid Zanjani
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
