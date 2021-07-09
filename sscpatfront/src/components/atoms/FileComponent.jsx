import React from 'react'
import pdf_image from "../../img/pdf_icon.png";
import {

    getTypeFile,
  
  } from "../../actions/helper";

const FileComponent = (props) => {
    const {file} = props
    return (
        <div className="link-container">
            <a
            class="file-link"
            href={file.path}
            title={file.title}
            >
            <div class="image-link">
                <img
                class=""
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
            <div class="text-link">
                <div class="text-link-title">
                {file.title}
                </div>
                <div class="">
                    <div class="">
                        {getTypeFile(file.format)}
                    </div>
                </div>
            </div>
            </a>
        </div>
    )
}

export default FileComponent
