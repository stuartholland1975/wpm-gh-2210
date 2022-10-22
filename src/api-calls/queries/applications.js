/** @format */

import {gql} from '@apollo/client';

export const GET_PROJECT_APPLICATION_DETAILS = gql`
	query GetProjectApplicationDetails($orderId: Int!) {
		applicationSummaryOrderheaderWithCumulativeValues(
			condition: { orderId: $orderId }
			orderBy: APPLICATION_NUMBER_ASC
		) {
			nodes {
				applicationId
				applicationNumber
				applicationReference
				prevCumulativeApplicationValue
				thisApplicationValue
				cumulativeApplicationValue
				itemCount
				locationCount
				applicationCurrent
			}
		}
	}
`;

export const GET_PROJECT_ITEMS_AVAILABLE_FOR_APPLICATION = gql`
	query GetProjectItemsAvailableForApplication($orderId: Int!) {
		wpmGraphqlGetItemsAvailableForApplication(
			filter: { orderheaderId: { equalTo: $orderId } }
		) {
			nodes {
				worksheetReference
				locationReference
				itemNumber
				activityCode
				activityDescription
				qtyComplete
				valueComplete
				unitPayableTotal
				id
				sitelocationId
				valueApplied
			}
		}
		wpmGraphqlGetLocationsAvailableForApplication(
			filter: { orderheaderId: { equalTo: $orderId } }
		) {
			nodes {
				worksheetReference
				reference
				id
				imageCount
				itemCount
				itemsComplete
				valueComplete
				orderheaderId
				valueApplied
			}
		}
		wpmGraphqlGetWorksheetsAvailableForApplication(
			filter: { orderheaderId: { equalTo: $orderId } }
		) {
			nodes {
				worksheetReference
				itemNumber
				activityCode
				activityDescription
				qtyComplete
				valueComplete
				dateComplete
				supervisorName
				id
				orderdetailId
				sitelocationId
			}
		}
	}
`;

export const GET_APPLICATION_HEADERS = gql`
	query GetApplicationHeaders {
		applicationSummaryWithCumulativeValues {
			nodes {
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

export const GET_CURRENT_APPLICATION = gql`
	query GetCurrentApplication {
		applications(condition: { applicationCurrent: true }) {
			nodes {
				id
				applicationReference
				applicationNumber
			}
		}
	}
`;

export const GET_PROJECTS_AVAILABLE_FOR_APPLICATION = gql`
	query GetProjectsAvailableForApplication {
		wpmGraphqlGetOrdersAvailableForApplication {
			nodes {
				area
				areaId
				averageItemValue
				averageLocationValue
				documentCount
				endDate
				id
				imageCount
				issuedDate
				itemCount
				itemCountBoq
				itemCountVarn
				itemsComplete
				itemsCompleteBoq
				itemsCompleteVarn
				locationCount
				locationsComplete
				notes
				orderNumber
				orderStatusId
				orderValueLabour
				orderValueMaterials
				orderValueOther
				orderValueTotal
				orderValueTotalApplied
				orderValueTotalBoq
				orderValueTotalComplete
				orderValueTotalVarn
				projectTitle
				startDate
				statusDescription
				workType
				worktypeId
			}
		}
	}
`;
