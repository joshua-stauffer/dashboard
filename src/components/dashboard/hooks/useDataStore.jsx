
import { useGenericStore } from './useGenericStore';
import { useSpecificStore } from './useSpecificStore';

import { parseView } from './../utils/parseView';

export function useDataStore(){
  
  // Quotes view data
  const [
    accessQuotesStore,
    quotesChangeList,
    quotesResetView,
    quotesViewHasBeenReset
  ] = useSpecificStore('quotes');

  let genQuotesDataObject = useGenericStore(
    'quotes',
    quotesChangeList,
    quotesResetView,
    quotesViewHasBeenReset
    );


  // Resources view data
  const [
    accessResourcesStore,
    resourcesChangeList,
    resourcesResetView,
    resourcesViewHasBeenReset
  ] = useSpecificStore('resources');

  let genResourcesDataObject = useGenericStore(
    'resources',
    resourcesChangeList,
    resourcesResetView,
    resourcesViewHasBeenReset
    );

  // Videos view data
  const [
    accessVideosStore,
    videosChangeList,
    videosResetView,
    videosViewHasBeenReset
  ] = useSpecificStore('videos');

  let genVideosDataObject = useGenericStore(
    'videos',
    videosChangeList,
    videosResetView,
    videosViewHasBeenReset
    );

  // blog view data
  const [
    accessBlogStore,
    blogChangeList,
    blogResetView,
    blogViewHasBeenReset
  ] = useSpecificStore('blog');

  let genBlogDataObject = useGenericStore(
    'blog',
    blogChangeList,
    blogResetView,
    blogViewHasBeenReset
    );

  // thesaurus view data
  const [
    accessThesaurusStore,
    thesaurusChangeList,
    thesaurusResetView,
    thesaurusViewHasBeenReset
  ] = useSpecificStore('thesaurus');

  let genThesaurusDataObject = useGenericStore(
    'thesaurus',
    thesaurusChangeList,
    thesaurusResetView,
    thesaurusViewHasBeenReset
    );


  // switch to deliver access to correct data source
  const getData = (rawView) => {

    const [view, id] = parseView(rawView);

    switch (view) {

      case 'quotes-gen': 
        return genQuotesDataObject;

      case 'quotes-sp': {
        const dataObject = accessQuotesStore(id);
        return dataObject;
      }

      case 'resources-gen':
        return genResourcesDataObject;

      case 'resources-sp': {
        const dataObject = accessResourcesStore(id)
        return dataObject;
      }

      case 'videos-gen':
        return genVideosDataObject;

      case 'videos-sp': {
        const dataObject = accessVideosStore(id)
        return dataObject;
      }

      case 'blog-gen':
        return genBlogDataObject;

      case 'blog-sp': {
        const dataObject = accessBlogStore(id)
        return dataObject;
      }

      case 'thesaurus-gen':
        return genThesaurusDataObject;

      case 'thesaurus-sp': {
        const dataObject = accessThesaurusStore(id)
        return dataObject;
      }

      case 'home':
        return {} // needs to be an empty object to support the destructuring that happens in Dashboard

      case 'error':
        return {}

      default:
        throw new Error('unknown view passed to useDataStore')
    }
  }

  return getData
}