import { gql } from '@apollo/client';
export const GET_BOATS = gql`
    query boats {
        boats(first: 10) {
            data {
                id
                name
                description
                price
            }
            paginatorInfo {
                currentPage
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
    }
  }
`;
