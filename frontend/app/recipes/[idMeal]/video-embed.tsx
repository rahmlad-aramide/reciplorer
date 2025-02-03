export const VideoEmbed = ({ url }: { url: string }) => {
    const generateEmbedLink = (url: string): string => {
      // Check if the URL contains a valid YouTube video ID
      const videoIdMatch = url.match(
        /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
  
      // If a match is found, construct the embed link
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      }

      // Return the original URL or handle invalid URLs
      throw new Error("Invalid YouTube URL");
    };
  
    try {
      const embedUrl = generateEmbedLink(url);
  
      return (
        <div className="relative flex w-full pb-[56.25%]">
          <iframe
            src={embedUrl}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          ></iframe>
        </div>
      );
    } catch (error) {
      console.error(error);
      return <p>Invalid YouTube URL</p>;
    }
  };