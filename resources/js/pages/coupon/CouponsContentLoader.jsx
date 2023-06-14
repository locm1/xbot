
import React, { useState, useEffect } from "react";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map((v, index) =>
          <tr className="border-bottom" key={`coupons-loader-${index}`}>
            <td>
              <ContentLoader
                height={39.375}
                width={324}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="156" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={133}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="100" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={117.5}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="80" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={191}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="80" height="18" />
              </ContentLoader>
            </td>
            <TableButtonContentLoader />
          </tr>
        )
      }
    </>
  );
};
