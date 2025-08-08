import { gql } from "@apollo/client";

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe($email: String, $name: String, $password: String) {
    updateMe(email: $email, name: $name, password: $password) {
      token
    }
  }
`;

export default UPDATE_ME_MUTATION;
