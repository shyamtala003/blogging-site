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
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareBlogLinks = ({ url, title, imageUrl }) => {
  // state for ope and close share buttons group
  const [show, setshow] = useState(false);
  const [copied, setCopied] = useState(false);

  console.log(title, url);
  return (
    <div className="share_container">
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
