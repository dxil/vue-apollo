import { find, filter } from 'lodash';
import { pubsub } from './subscriptions';
import {Company, Application, Meeting} from '../m_schema/tf_schema';

const authors = [
  { id: 1, firstName: 'Toms', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashkos', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

const resolveFunctions = {
  Query: {
    posts() {
      return posts;
    },
    author(_, { id }) {
      return find(authors, { id: id });
    },
    meeting: async(_, {name}) => {
      let doc = await Meeting.findOne({name: name})
      // console.log(doc)
      return doc
    },
    company(_, {name}) {
      return Company.findOne({name: name})
    },
    application(_, {id}) {
      return Application.findOne({id: _id})
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      pubsub.publish('postUpvoted', post);
      return post;
    },
  },
  Subscription: {
    postUpvoted(post) {
      return post;
    },
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    },
  },
  Meeting: {
    application: async (meeting) => {
      const doc = await Application.findOne({meetingId: meeting._id, type: '上市公司'})
      // console.log([doc])
      return [doc]
    }
  },
  Application: {
    company: async (application) => {
      // console.log(application)
      const doc = await Company.findOne({_id: application.corporationId})
      // console.log(doc)
      return doc
    }
  }
};

export default resolveFunctions;