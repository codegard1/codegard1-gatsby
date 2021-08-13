import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


import { Link, graphql } from "gatsby";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar/Sidebar";

// Public url prefix for images store in Azure
const blobStorageBaseUrl = `https://gadzooks.blob.core.windows.net/instagram/`;

// allImageSharp {
//   edges {
//     node {
//       original {
//         src
//       }
//     }
//   }
// }
const GalleryPage = ({ data }) => {
  console.log(data);
  const photos = data.allImageSharp.edges.map(e => {
    return {
      src: e.node.original.src,
      height: (e.node.original.height / 2),
      width: (e.node.original.width / 2)
    }
  }
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const photos = data.allInstagramPostsJson.nodes.map((photo,index) => ({
    src: blobStorageBaseUrl + photo.media[0].uri,
    title: photo.media[0].title,
    height: 1,
    width: 1, 
    key: `photo_${photo.id}`
  }));
  
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <Layout>
      <SEO
        title="Gallery"
        keywords={[
          `gallery`,
          `photos`
        ]}
      />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>
        <div className="post-list-main">
          <h2>Gallery</h2>
          <p>
            Eat shit, Instagram
          </p>


          <Gallery photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map(x => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
query {
  allInstagramPostsJson(limit: 100, sort: {order: DESC, fields: media___creation_timestamp}) {
    nodes {
      media {
        uri
        creation_timestamp
        title
      }
      id
    }
  }
}`;

export default GalleryPage;
