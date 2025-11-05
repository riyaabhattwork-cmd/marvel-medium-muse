import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: ArticleInput!) {
    createArticle(input: $input) {
      id
      title
      description
      body
      slug
      tagList
      likesCount
      commentsCount
      favorited
      createdAt
      author {
        id
        username
        email
      }
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($slug: String!, $input: ArticleInput!) {
    updateArticle(slug: $slug, input: $input) {
      id
      title
      description
      body
      slug
      updatedAt
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($slug: String!) {
    deleteArticle(slug: $slug)
  }
`;

export const LIKE_ARTICLE = gql`
  mutation LikeArticle($slug: String!) {
    likeArticle(slug: $slug) {
      id
      slug
      likesCount
      favorited
    }
  }
`;

export const UNLIKE_ARTICLE = gql`
  mutation UnlikeArticle($slug: String!) {
    unlikeArticle(slug: $slug) {
      id
      slug
      likesCount
      favorited
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($articleSlug: String!, $body: String!) {
    addComment(articleSlug: $articleSlug, body: $body) {
      id
      body
      createdAt
      author {
        id
        username
      }
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation FollowUser($username: String!) {
    followUser(username: $username) {
      id
      username
      followersCount
      following
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($username: String!) {
    unfollowUser(username: $username) {
      id
      username
      followersCount
      following
    }
  }
`;

export const ADMIN_CREATE_USER = gql`
  mutation AdminCreateUser($input: AdminCreateUserInput!) {
    adminCreateUser(input: $input) {
      id
      username
      email
    }
  }
`;

export const ADMIN_UPDATE_USER = gql`
  mutation AdminUpdateUser($id: ID!, $input: AdminUpdateUserInput!) {
    adminUpdateUser(id: $id, input: $input) {
      id
      username
      email
      bio
      image
      followersCount
      followingCount
    }
  }
`;

export const ADMIN_DELETE_USER = gql`
  mutation AdminDeleteUser($id: ID!) {
    adminDeleteUser(id: $id)
  }
`;
