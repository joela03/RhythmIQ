import Navbar from '../components/Navbar'

const LandingPage = () => {
    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar/>
            <div className="max-w-6xl mx-auto px-4 py-4">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Welcome to LifeTracker
                </h1>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <p className="text-lg text-gray-600 text-center mb-6">
                        Track your life, stop slipping, push each other!
                    </p>
                    <div className="flex justify-center">
                        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;