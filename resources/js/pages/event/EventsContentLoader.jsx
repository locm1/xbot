
import React, { useState, useEffect } from "react";
import ContentLoader, { BulletList, Facebook } from "react-content-loader";
import TableButtonContentLoader from "@/components/loader/TableButtonContentLoader";

export default () => {
  const loadingTables = [_, _, _, _, _, _, _, _, _, _,];
  return (
    <>
      {
        loadingTables.map((v, index) =>
          <tr className="border-bottom" key={`event-users-loader-${index}`}>
            <td>
              <ContentLoader
                height={39.375}
                width={208}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="208" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={211}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="211" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={231}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="231" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={163}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="163" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={142}
                speed={1}
              >
                <rect x="0" y="10" rx="3" ry="3" width="142" height="18" />
              </ContentLoader>
            </td>
            <td>
              <ContentLoader
                height={39.375}
                width={240}
                speed={1}
              >
                <rect x="15" y="2" rx="3" ry="3" width="110" height="35" />
              </ContentLoader>
            </td>
          </tr>
        )
      }
    </>
  );
};
