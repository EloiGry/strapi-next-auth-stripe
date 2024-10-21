// export async function getSummaryById(summaryId: string) {
//     return fetchApi(`${baseUrl}/api/summaries/${summaryId}`);
//   }

import { fetchAPI } from "./fetch-api";

export async function getCourses() {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/courses`;
    const urlParamsObject = ''
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}

export async function getCourse(slug: string) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/courses`;
    const urlParamsObject = {filters: { slug }}
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}

export async function getCourseById(id: number) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/courses`;
    const urlParamsObject = {filters: { id }}
    const options = {headers: {Authorization: `Bearer ${token}`}};
    return await fetchAPI(path, urlParamsObject, options);
}


