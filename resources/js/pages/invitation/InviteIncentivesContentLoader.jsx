
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
                width={272.3}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="163" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={215.8}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="60" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={186}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="60" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={524.8}
                speed={1}
              >
                <rect x="15" y="2" rx="3" ry="3" width="118" height="35" />
                <rect x="145" y="2" rx="3" ry="3" width="100" height="35" />
                <rect x="260" y="2" rx="3" ry="3" width="50" height="35" />
                <rect x="325" y="2" rx="3" ry="3" width="50" height="35" />
              </ContentLoader>
            </td>
          </tr>
        )
      }
    </>
  );
};
