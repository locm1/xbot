
import React, { useState, useEffect } from "react";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map(v =>
          <tr className="border-bottom">
            <td>
              <ContentLoader
                height={39.375}
                width={100}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="80" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={170}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="120" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={106}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="60" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={80}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="60" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={118.8}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="71" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={250}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="223" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={170}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="131" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={150}
                speed={1}
              >
                <rect x="15" y="2" rx="3" ry="3" width="50" height="35" />
              </ContentLoader>
            </td>
          </tr>
        )
      }
    </>
  );
};
