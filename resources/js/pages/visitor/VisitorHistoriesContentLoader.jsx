
import React, { useState, useEffect } from "react";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map((v, index) =>
          <tr className="border-bottom" key={`visitor-histories-loader-${index}`}>
            <td>
              <ContentLoader
                height={39.375}
                width={230.48}
                speed={1}
              >
                <rect x="0" y="4" rx="100" ry="100" width="32" height="32" />
                <rect x="70" y="3" rx="4" ry="4" width="120" height="10" />
                <rect x="70" y="22" rx="3" ry="3" width="100" height="13" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={150}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="130" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={207}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="120" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={432.3}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="301" height="18" />
              </ContentLoader>
            </td>
            <TableButtonContentLoader />
          </tr>
        )
      }
    </>
  );
};
