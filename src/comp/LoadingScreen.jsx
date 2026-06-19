import "./loading.css"
import { ColorRing } from "react-loader-spinner"

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader-container">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <h2>Loading...</h2>
        <p>Please wait while we load your content</p>
      </div>
    </div>
  )
}

export default LoadingScreen
