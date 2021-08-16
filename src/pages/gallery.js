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


const GalleryPage = ({ data }) => {
  console.log(data);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // Pre-process image data from JSON
  const photos = data.allInstagramPosts1Json.nodes.map(photo => ({
    ...photo,
    src: blobStorageBaseUrl + photo.uri,
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
          `photos`,
          `Instagram`
        ]}
      />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>
        <div className="post-list-main">
          <h2>Gallery</h2>
          <p>
            Custom implementation of my own <a target="_blank" href="https://www.instagram.com/codegard1/">Instagram feed</a> using <a href="https://azure.microsoft.com/en-us/services/storage/blobs/" target="_blank">Azure Blob Storage </a> and <a href="https://github.com/neptunian/react-photo-gallery" target="_blank">react-photo-gallery</a>.
          </p>


          <Gallery
            photos={photos}
            onClick={openLightbox}
            margin={5}
          // direction={'row'}
          // columns={6}
          // targetRowHeight={100}
          />
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
  allInstagramPosts1Json(limit: 50, sort: {fields: creation_timestamp, order: DESC}) {
    nodes {
      creation_timestamp
      height
      width
      uri
      type
      title
      ratio
      id
    }
  }
}

`;

export default GalleryPage;
