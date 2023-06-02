
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
                width={232}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={377}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="200" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={234}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100" height="18" />
              </ContentLoader>
            </td>
            <TableButtonContentLoader />
          </tr>
        )
      }
    </>
  );
};
