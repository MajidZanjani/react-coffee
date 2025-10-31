export default function MobileApp() {
  return (
    <div className="mt-10 text-text-dark font-inter flex flex-col lg:flex-row justify-between items-center gap-10">
      <div>
        <h2 className="font-bold text-2xl lg:text-6xl lg:leading-[4.5rem] mb-5">
          <span className="text-text-accent italic">Download </span>
          <span>
            our apps
            <br />
            to start ordering
          </span>
        </h2>

        <h3 className="text-left mb-10 max-w-md">
          Download the Resource app today and experience the comfort of ordering
          your favorite coffee from wherever you are
        </h3>

        <div className="flex gap-5 flex-wrap">
          {/* App Store */}
          <div className="app border border-text-dark rounded-[45px] px-5 py-3 flex items-center gap-3 hover:bg-text-dark hover:text-text-light transition">
            <svg
              width="28"
              height="33"
              viewBox="0 0 28 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <path
                d="M22.7069 17.6307C22.67 13.6324 26.0647 11.6872 26.2199 11.5966C24.2974 8.86366 21.3175 8.49026 20.2703 8.46048C17.7676 8.20369 15.3399 9.92062 14.065 9.92062C12.7646 9.92062 10.8014 8.48529 8.68543 8.52747C5.96257 8.56841 3.41529 10.1055 2.01823 12.4923C-0.864945 17.359 1.28535 24.5108 4.04766 28.4446C5.42945 30.3712 7.04408 32.5223 9.15748 32.4466C11.2251 32.3635 11.9974 31.1614 14.4925 31.1614C16.9647 31.1614 17.69 32.4466 19.8453 32.3983C22.0644 32.3635 23.4614 30.463 24.7948 28.519C26.3917 26.3108 27.0329 24.1362 27.0584 24.0245C27.0062 24.0071 22.7489 22.4229 22.7069 17.6307Z"
                fill="currentColor"
              />
              <path
                d="M18.6353 5.87268C19.7474 4.51675 20.5082 2.67205 20.297 0.800049C18.6875 0.86952 16.6746 1.88554 15.5155 3.21169C14.49 4.38029 13.5739 6.29571 13.8105 8.097C15.6185 8.2285 17.4749 7.20752 18.6353 5.87268Z"
                fill="currentColor"
              />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-xs">Available on the</span>
              <span className="font-semibold text-sm">App Store</span>
            </div>
          </div>

          {/* Google Play */}
          <div className="app border border-text-dark rounded-[45px] px-5 py-3 flex items-center gap-3 hover:bg-text-dark hover:text-text-light transition">
            <svg
              width="31"
              height="34"
              viewBox="0 0 31 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
            >
              <path
                d="M0.755796 2.20297C0.393349 2.57289 0.183594 3.14884 0.183594 3.89471V30.4994C0.183594 31.2453 0.393349 31.8212 0.755796 32.1911L0.845252 32.2723L16.1359 17.37V17.0181L0.845252 2.11575L0.755796 2.20297Z"
                fill="currentColor"
              />
              <path
                d="M23.0778 22.34L17.9866 17.37V17.0181L23.084 12.0482L23.1981 12.1128L29.2348 15.4617C30.9575 16.4121 30.9575 17.976 29.2348 18.9324L23.1981 22.2753L23.0778 22.34Z"
                fill="currentColor"
              />
              <path
                d="M22.2735 23.2007L17.062 18.1195L1.68188 33.1166C2.25409 33.7031 3.1872 33.7737 4.24832 33.1873L22.2735 23.2007Z"
                fill="currentColor"
              />
              <path
                d="M22.2735 11.1876L4.24832 1.20103C3.1872 0.620579 2.25409 0.691254 1.68188 1.27772L17.062 16.2688L22.2735 11.1876Z"
                fill="currentColor"
              />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-xs">Available on</span>
              <span className="font-semibold text-sm">Google Play</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img
          src="assets/images/mobile-screens-2.png"
          alt="Mobile App Image"
          className="w-full max-w-sm lg:max-w-md"
        />
      </div>
    </div>
  );
}
