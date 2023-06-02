
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
                width={400}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="300" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={185.4}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="180" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={158}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="150" height="18" />
              </ContentLoader>
            </td>
            <TableButtonContentLoader />
          </tr>
        )
      }
    </>
  );
};
