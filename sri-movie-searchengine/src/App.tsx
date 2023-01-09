import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  WithSearch
} from "@elastic/react-search-ui";
import { Sorting } from "@elastic/react-search-ui";


import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { SearchDriverOptions } from "@elastic/search-ui";

// const connector = new AppSearchAPIConnector({
//   searchKey: "search-f4xtmsr45wp1wuxpdr54rx8v",
//   engineName: "engine-sri",
//   endpointBase: "https://sri-project.ent.europe-west3.gcp.cloud.es.io"
// });

const connector = new AppSearchAPIConnector({
  searchKey: "search-f4xtmsr45wp1wuxpdr54rx8v",
  engineName: "engine-sri-final-2",
  endpointBase: "https://sri-project.ent.europe-west3.gcp.cloud.es.io"
});

const config: SearchDriverOptions = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      Title: {
        snippet: {
          fallback: true
        },
      },
      Year: { raw: {} },
      Description: { raw: {} },
      Genres: { raw: {} },
      "Stars": { raw: {} },
      "Directors": { raw: {} },
      "IMDb url": { raw: {} },
      "Metacritic url": { raw: {} },
      "IMDb Rating": { raw: {} },
      "Metacritic Rating": { raw: {} },
      "Image url": { raw: {} }
    },
    search_fields: {
      Title: {
        weight: 40
      },
      Stars: {
        weight: 20
      },
      Directors: {
        weight: 10
      },
      Description: {
        weight: 1
      },
      Year: {
        weight: 5
      },
      Genres: {
        weight: 60
      }
    },
    disjunctiveFacets: ["Year", "IMDb Rating"],
    facets: {
      Year: {
        type: "range",
        ranges: [
          { from: 0, to: 1950, name: "- 1950" },
          { from: 1951, to: 2000, name: "1950 - 2000" },
          { from: 2001, to: 2010, name: "2000 - 2010" },
          { from: 2011, name: "2010 -" }
        ]
      },
      "IMDb Rating": {
        type: "range",
        ranges: [
          { from: 0.0, to: 4.0, name: "Very bad" },
          { from: 4.1, to: 6.0, name: "Bad" },
          { from: 6.1, to: 8.0, name: "Good" },
          { from: 8.1, to: 9.0, name: "Very good" },
          { from: 9.1, name: "Exceptional" }
        ]
      },
      Stars: { type: "value", size: 200 },
      Genres: { type: "value", size: 30 },
      Directors: { type: "value", size: 200 }
    }
  }
};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }: { wasSearched: boolean }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }: { wasSearched: boolean }) => {
          return (
            <div className="App">
              <div>
                <header className="my-title"> Movie <span>SRI</span>ch Engine </header>
              </div>
              <ErrorBoundary>
                <Layout
                  header={<SearchBox autocompleteSuggestions={true} searchAsYouType={true} debounceLength={300} />}
                  sideContent={
                    <div>
                      <Sorting
                        label="Sort by"
                        sortOptions={[
                          {
                            name: "Relevance",
                            value: "",
                            direction: ""
                          },
                          {
                            name: "Year Desc",
                            value: "Year",
                            direction: "desc"
                          },
                          {
                            name: "Year Asc",
                            value: "Year",
                            direction: "asc"
                          },
                          {
                            name: "IMDb Rating Desc",
                            value: "IMDb Rating",
                            direction: "desc"
                          },
                          {
                            name: "IMDb Rating Asc",
                            value: "IMDb Rating",
                            direction: "asc"
                          },
                          {
                            name: "Metacritic Rating Desc",
                            value: "Metacritic Rating",
                            direction: "desc"
                          },
                          {
                            name: "Metacritic Rating Asc",
                            value: "Metacritic Rating",
                            direction: "asc"
                          }
                        ]}
                      />
                      <Facet
                        field="Year"
                        label="Year"
                        filterType="any"
                      />
                      <Facet
                        field="IMDb Rating"
                        label="IMDb Rating"
                        filterType="any"
                      />
                      <Facet
                        field="Stars"
                        label="Stars"
                        isFilterable={true}
                      />
                      <Facet
                        field="Genres"
                        label="Genres"
                        isFilterable={true}
                      />
                      <Facet
                        field="Directors"
                        label="Directors"
                        isFilterable={true}
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="Title"
                      urlField="IMDb url"
                      thumbnailField="Image url"
                      shouldTrackClickThrough
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
