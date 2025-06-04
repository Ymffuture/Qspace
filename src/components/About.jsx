import React from 'react'
import { MdArrowBack, MdArrowCircleUp } from 'react-icons/md'
import { Link } from 'react-router-dom'

const About = () => {
  const colorPara = {
    fontSize: '16px',
    padding: '8px',
    lineHeight: '1.8',
    color: '#4B5563'
  }

  const headingStyle = 'text-[24px] md:text-[28px] font-bold text-gray-700 mb-2 border-b-2 border-[#1E90FF] inline-block pb-1'

  return (
    <div className='p-6 md:p-10 bg-[#F0F8FF] text-gray-800 min-h-screen' id='top'>
      {/* Back button */}
      <div className='text-[#1E90FF] border-l-4 border-[#32CD32] p-3 mt-2 mb-6 hover:border-l-[10px] transition-all'>
        <Link to='/' className='hover:text-blue-600 text-sm font-semibold flex items-center gap-2'>
          <MdArrowBack size={18} /> Back to Home
        </Link>
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8'>

        <section>
          <h1 className={headingStyle}>About Quorvex</h1>
          <p style={colorPara}>
            At <strong className='text-[#1E90FF]'>Quorvex Institute</strong>, we're passionate about democratizing high-quality education across the globe. 
            Whether you're beginning your journey in web development or mastering data science, we provide dynamic, industry-driven, and up-to-date courses 
            tailored to the ever-evolving tech landscape. Our platform blends interactive lessons, AI tutors, community-driven discussions, and modern tooling 
            to give learners a truly world-class experience.
          </p>
        </section>

        <section>
          <h1 className={headingStyle}>Terms of Services</h1>
          <p style={colorPara}>
            By accessing our services, you agree to comply with all local laws and Quorvex's learning ethics. Misuse of our platform — including plagiarism, 
            malicious activity, or abusive conduct — will result in immediate account suspension. All intellectual content remains property of Quorvex and its instructors.
          </p>
        </section>

        <section>
          <h1 className={headingStyle}>Privacy Policy</h1>
          <p style={colorPara}>
            We respect your privacy. All personal information collected is stored securely, never sold, and only used to enhance your learning experience. 
            We use analytics tools to improve performance but do not track personally identifiable data unless you've consented.
          </p>
        </section>

        <section>
          <h1 className={headingStyle}>Contact Us</h1>
          <p style={colorPara}>
            Have questions or feedback? Reach out at <a href="mailto:quorvexinstitute@gmail.com" className='text-[#1E90FF] font-medium underline'>quorvexinstitute@gmail.com</a> or visit our <a href='https://quorvexinstitute.vercel.app' className='text-[#FFD700] font-medium underline'>official site</a>. We’re here to support your growth every step of the way.
          </p>
        </section>

      </div>

      {/* Scroll to Top Button */}
      <div className='fixed bottom-5 right-5 z-50'>
        <a href='#top' aria-label='Back to top'>
          <MdArrowCircleUp className='text-[50px] text-[#1E90FF] hover:text-[#32CD32] transition-all animate-bounce' />
        </a>
      </div>
    </div>
  )
}

export default About
