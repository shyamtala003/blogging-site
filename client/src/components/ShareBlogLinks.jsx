import React, { useState } from "react";
import copyIcon from "../assets/copyicon.svg";
import shareIcon from "../assets/share.svg";
import shareIconFill from "../assets/copyfill.svg";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  InstapaperIcon,
} from "react-share";
import { Helmet } from "react-helmet";

import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareBlogLinks = ({ url, title, imageUrl }) => {
  // state for ope and close share buttons group
  const [show, setshow] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className="share_container">
       <Helmet>
        <meta
          property="og:url"
          content={
            "https://plm-staging.s3.amazonaws.com/images/21_06_2023_17_30_412.jpg"
          }
        />
        <meta property="og:title" content={"ploom web app"} />
        <meta property="og:description" content={"lorem iplsum ldollar"} />
        <meta
          property="og:image"
          content={
            "https://plm-staging.s3.amazonaws.com/images/21_06_2023_17_30_412.jpg"
          }
        />
      </Helmet>
      
      <button
        className="share_btn"
        onClick={() => {
          setshow(!show);
        }}
      >
        <img src={shareIcon} alt="" />
      </button>
      <div className={`${show ? "show_share_group" : ""} share_group `}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <InstapaperShareButton url={url}>
          <InstapaperIcon size={32} round={true}></InstapaperIcon>
        </InstapaperShareButton>
        <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
          <button className="copy_to_clipBoard">
            {copied ? <img src={shareIconFill} /> : <img src={copyIcon} />}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShareBlogLinks;
