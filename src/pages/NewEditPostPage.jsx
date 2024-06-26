import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { usePosts } from '../contexts/PostContext';

const NewEditPostPage = () => {
  const { currentPost, createPost, editPost } = usePosts();
  const [previewImage, setPreviewImage] = useState(
    currentPost.image ? currentPost.image : null
  );
  const [imageData, setImageData] = useState(
    currentPost.id ? currentPost.image : {}
  );
  const [title, setTitle] = useState(currentPost.id ? currentPost.title : '');

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImageData(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageData.name) return;
    const form = new FormData();
    form.append('image', imageData);
    form.append('title', title);
    if (currentPost.id) await editPost(currentPost.id, form);
    else await createPost(form);

    window.location.assign('/');
  };

  document.title = `Meiersbook | ${currentPost.id ? 'Edit' : 'New'} post`;

  return (
    <>
      <h1 className="primary-heading">
        {currentPost.id ? 'Update' : 'New'} Post
      </h1>
      <form
        className="front-panel form-post-data"
        id={currentPost.id ? 'edit' : 'new'}
        data-id={currentPost.id ? currentPost.id : ''}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <div className="image-preview">
            {previewImage && (
              <img
                src={
                  currentPost.image === previewImage
                    ? require(`../img/posts/${currentPost.image}`)
                    : previewImage
                }
                alt="preview"
              />
            )}
          </div>
          <input
            id="image"
            className="btn"
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChangeImage}
          />
        </div>
        <div className="form-group">
          <label className="title-heading">Description</label>
          <textarea
            className="title-heading form-control"
            type="text"
            name="title"
            rows="6"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            {currentPost.id ? currentPost.title : ''}
          </textarea>
        </div>
        <div className="buttons-nav">
          <Link to="/">
            <Button level="secondary">Go back</Button>
          </Link>
          <Button level="primary" disabled={!imageData.name && !currentPost.id}>
            {currentPost.id ? 'Update' : 'Publish'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default NewEditPostPage;
