import { gql } from '@apollo/client';
export const GET_BOATS = gql`
    query boats($page: Int!, $name: String) {
        boats(first: 5, page: $page, name: $name) {
            data {
                id
                name
                description
                price
                sold
            }
            paginatorInfo {
                currentPage
                hasMorePages
            }
        }
    }
`;

export const GET_BOAT = gql`
  query boat($id: ID!) {
    boat(id: $id) {
        id
        name
        description
        price
        year
        length
        location
        sold
    }
  }
`;
