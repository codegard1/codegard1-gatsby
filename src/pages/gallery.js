import React, { useState, useCallback } from "react";
// import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import { graphql } from "gatsby";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar/Sidebar";

import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { ITheme, getTheme, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useConst } from '@fluentui/react-hooks';

const theme = getTheme();
const { palette, fonts } = theme;
const ROWS_PER_PAGE = 1;
const MAX_ROW_HEIGHT = 250;
const classNames = mergeStyleSets({
  listGridExample: {
    overflow: 'hidden',
    fontSize: 0,
    position: 'relative',
  },
  listGridExampleTile: {
    textAlign: 'center',
    outline: 'none',
    position: 'relative',
    float: 'left',
    background: palette.neutralLighter,
    selectors: {
      'focus:after': {
        content: '',
        position: 'absolute',
        left: 2,
        right: 2,
        top: 2,
        bottom: 2,
        boxSizing: 'border-box',
        border: `1px solid ${palette.white}`,
      },
    },
  },
  listGridExampleSizer: {
    paddingBottom: '100%',
  },
  listGridExamplePadder: {
    position: 'absolute',
    left: 2,
    top: 2,
    right: 2,
    bottom: 2,
  },
  listGridExampleLabel: {
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#FFFFFF',
    position: 'absolute',
    padding: 10,
    bottom: 0,
    left: 0,
    width: '100%',
    fontSize: fonts.small.fontSize,
    boxSizing: 'border-box',
  },
  listGridExampleImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
});

// Public url prefix for images store in Azure
const blobStorageBaseUrl = `https://gadzooks.blob.core.windows.net/instagram/`;


const GalleryPage = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // Pre-process image data from JSON
  const photos = useConst(
    data.allInstagramPosts1Json.nodes.map(photo => ({
      ...photo,
      src: blobStorageBaseUrl + photo.uri,
      key: `photo_${photo.id}`
    }))
  );

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const columnCount = React.useRef(0);
  const rowHeight = React.useRef(0);

  const getItemCountForPage = React.useCallback((itemIndex, surfaceRect) => {
    if (itemIndex === 0) {
      columnCount.current = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      rowHeight.current = Math.floor(surfaceRect.width / columnCount.current);
    }
    return columnCount.current * ROWS_PER_PAGE;
  }, []);

  const onRenderCell = React.useCallback((item, index) => {
    return (
      <div
        className={classNames.listGridExampleTile}
        data-is-focusable
        style={{
          width: 100 / columnCount.current + '%',
        }}
        onClick={(e) => { openLightbox(e, { item, index }) }}
      >
        <div className={classNames.listGridExampleSizer}>
          <div className={classNames.listGridExamplePadder}>
            <img src={item.src} className={classNames.listGridExampleImage} />
            <span className={classNames.listGridExampleLabel}>{item.title}</span>
          </div>
        </div>
      </div>
    );
  }, []);

  const getPageHeight = React.useCallback(() => {
    return rowHeight.current * ROWS_PER_PAGE;
  }, []);

  const cabbo = (e, x, y) => {
    const o = { e, x, y };
    debugger;
  }

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


          {/* <Gallery
          photos={photos}
          onClick={openLightbox}
          margin={5}
          direction={'row'}
          columns={6}
          targetRowHeight={100}
          /> */}


          <FocusZone>
            <List
              className={classNames.listGridExample}
              items={photos}
              getItemCountForPage={getItemCountForPage}
              getPageHeight={getPageHeight}
              renderedWindowsAhead={1}
              onRenderCell={onRenderCell}
            />
          </FocusZone>
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
  allInstagramPosts1Json(limit: 200, sort: {fields: creation_timestamp, order: DESC}) {
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
