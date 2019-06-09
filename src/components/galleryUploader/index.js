import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd'; import './style.css'
import { getBase64 } from '../../helpers/utility';
import 'antd/dist/antd.css';
import './style.css';


class GalleryUploader extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
            // {
            //     uid: '-1',
            //     name: 'xxx.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // },
        ],
    };

    handleCancel = () => {
        this.setState({ previewVisible: false });
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    base64file = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file);
        }
    }

    getImgString = (file) => {
        this.base64file(file);
        this.setState({
            fileSend: file.preview
        })
        return true; 
    }

    // handleChange = ({ fileList }) => {
    //     this.props.action(fileList);
    //     this.setState({ fileList });
    // }

    handleChange = (info) => {
        if (info.file.status === "done") {
            // console.log(info.file)
            this.props.action(info.file.originFileObj.preview,info.file.name)
        }
            
        this.setState({ fileList: info.fileList })
    }

    handleSuccess = (response, file) => {
        this.props.action(file);
    }

    render() {
        // console.log(this.state.fileSend)
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Subir</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    // action="/api/upload"
                    // action=""
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    customRequest = {this.props.customRequest}
                    beforeUpload = {this.getImgString}
                    // onSuccess={this.handleSuccess}
                >
                    {fileList.length >= this.props.maxFiles ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

}

export default GalleryUploader

