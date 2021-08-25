import React from 'react'
import pdf_image from "../../img/pdf_icon.png";
import {

    getTypeFile,
    filePath,
  } from "../../actions/helper";

const FileComponent = (props) => {
    const {file} = props
    return (
        <div className="link-container">
            <a
            className="file-link"
            href={filePath(file.path)}
            title={file.title}
            target="_blank"
            rel="noreferrer"
            >
            <div className="image-link">
                <img
                className=""
                src={
                    file.format === "application/pdf"
                    ? pdf_image
                    : file.thumbnail
                }
                aria-hidden="true"
                alt="presentation"
                data-mime-type="image/jpeg"
                />
            </div>
            <div className="text-link">
                <div className="text-link-title">
                {file.title}
                </div>
                <div className="">
                    <div className="">
                        {getTypeFile(file.format)}
                    </div>
                </div>
            </div>
            </a>
        </div>
    )
}

export default FileComponent
