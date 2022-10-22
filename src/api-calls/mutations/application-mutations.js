import {gql} from '@apollo/client'

export const REOPEN_CLOSED_APPLICATION = gql`
    mutation OpenClosedApplication($appToOpen:Int!) {
        openClosedApplication(input: {appToOpen: $appToOpen}) {
            applicationSummaryWithCumulativeValues {
                id
                applicationNumber
                applicationReference
                applicationDate
                applicationCurrent
                applicationOpen
                applicationSubmitted
                prevCumulativeApplicationValue
                thisApplicationValue
                cumulativeApplicationValue
                itemCount
                locationCount
                imageCount
                orderCount
                areaCount
            }
        }
    }
`;


export const AUTO_INCREMENT_APPLICATION = gql`
    mutation AutoIncrementApplication {
        autoCloseCurrentApplication(input: {}) {
            applicationSummaryWithCumulativeValues {
                id
                applicationNumber
                applicationReference
                applicationDate
                applicationCurrent
                applicationOpen
                applicationSubmitted
                prevCumulativeApplicationValue
                thisApplicationValue
                cumulativeApplicationValue
                itemCount
                locationCount
                imageCount
                orderCount
                areaCount
            }
        }
    }
`


export const REMOVE_APPLICATION_SUBMISSION_FLAG = gql`
    mutation RemoveApplicationSubmissionFlag($id: Int!) {
        updateApplication(
            input: { patch: { applicationSubmitted: false }, id: $id }
        ) {
            clientMutationId
        }
    }
`;

export const SUBMIT_APPLICATION = gql`
    mutation SubmitApplication($appNumber:Int!) {
        submitApplication(input: {appNumber: $appNumber}) {
            applicationSummaryWithCumulativeValues {
                id
                applicationNumber
                applicationReference
                applicationDate
                applicationCurrent
                applicationOpen
                applicationSubmitted
                prevCumulativeApplicationValue
                thisApplicationValue
                cumulativeApplicationValue
                itemCount
                locationCount
                imageCount
                orderCount
                areaCount
            }
            query {
                submittedApplicationByApplicationId(applicationId: $appNumber) {
                    applicationHeader
                    applicationId
                    areas
                    id
                    images
                    orderdetails
                    orderheaders
                    otherInfo
                    sitelocations
                    worksheets
                }
            }
        }
    }

`;

