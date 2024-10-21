type Props = {
    url : string
}

const Video = ({url}: Props) => {
    return (
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full"
          src={url}
          title="YouTube video player"
        //   frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  export default Video;