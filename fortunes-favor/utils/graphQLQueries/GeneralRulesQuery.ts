import { gql } from "@apollo/client";

const GENERAL_RULES_QUERY = gql`
  query GetGenericRules {
    genericRules {
      href
      img {
        target
        style
      }
      lists {
        label
        items
      }
      ruleType
      shortText
      shortTitle
      slug
      title
      subRules {
        href
        img {
          target
          style
        }
        lists {
          label
          items
        }
        ruleType
        shortText
        shortTitle
        subRules {
          href
          img {
            target
            style
          }
          lists {
            label
            items
          }
          ruleType
          shortText
          shortTitle
          slug
          text {
            text
            type
            choices
          }
          title
          subRules {
            href
            img {
              target
              style
            }
            lists {
              label
              items
            }
            ruleType
            shortText
            shortTitle
            slug
            text {
              text
              type
              choices
            }
            title
          }
        }
        slug
        text {
          choices
          text
          type
        }
        title
      }
      text {
        choices
        text
        type
      }
    }
  }
`;

export default GENERAL_RULES_QUERY;
