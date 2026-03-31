import AdminCMSController from './AdminCMSController'
import BlogPostController from './BlogPostController'
import FeedController from './FeedController'
import BlogCommentController from './BlogCommentController'
import MediaController from './MediaController'
import AuthorBlogController from './AuthorBlogController'
import BlogLikeController from './BlogLikeController'
const CMS = {
    AdminCMSController: Object.assign(AdminCMSController, AdminCMSController),
BlogPostController: Object.assign(BlogPostController, BlogPostController),
FeedController: Object.assign(FeedController, FeedController),
BlogCommentController: Object.assign(BlogCommentController, BlogCommentController),
MediaController: Object.assign(MediaController, MediaController),
AuthorBlogController: Object.assign(AuthorBlogController, AuthorBlogController),
BlogLikeController: Object.assign(BlogLikeController, BlogLikeController),
}

export default CMS