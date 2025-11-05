import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles($filter: ArticleFilterInput) {
    articles(filter: $filter) {
      articles {
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
        updatedAt
        author {
          id
          username
          email
        }
      }
      articlesCount
    }
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($slug: String!) {
    article(slug: $slug) {
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
      updatedAt
      author {
        id
        username
        email
      }
    }
  }
`;

export const GET_USER_ARTICLES = gql`
  query GetUserArticles($filter: ArticleFilterInput!) {
    articles(filter: $filter) {
      articles {
        id
        title
        description
        slug
        createdAt
        author {
          id
          username
          email
        }
      }
      articlesCount
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      id
      username
      email
      bio
      image
      followersCount
      followingCount
      following
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
      email
      bio
      image
      followersCount
      followingCount
      following
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      id
      type
      actor {
        id
        username
      }
      articleId
      commentId
      read
      createdAt
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($articleSlug: String!) {
    comments(articleSlug: $articleSlug) {
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

export const ADMIN_GET_USERS = gql`
  query AdminGetUsers($page: Int, $perPage: Int) {
    adminUsers(page: $page, perPage: $perPage) {
      totalCount
      users {
        id
        username
        email
        bio
        image
        followersCount
        followingCount
      }
    }
  }
`;

export const ADMIN_GET_STATS = gql`
  query AdminGetStats {
    adminStats {
      users
      articles
      comments
      likes
    }
  }
`;
