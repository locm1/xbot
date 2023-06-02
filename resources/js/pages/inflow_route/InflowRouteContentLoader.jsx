
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
                width={107}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={175}
                width={200}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="150" height="150" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={500}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="450" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={107}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={109}
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
