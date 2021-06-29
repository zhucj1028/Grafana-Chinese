import React, { FC, useState, useCallback, useEffect } from 'react';
import { ConfirmModal, Button, LinkButton } from '@grafana/ui';
import { getBackendSrv } from '@grafana/runtime';
import { noop } from 'rxjs';
import { Snapshot } from '../types';

interface Props {
  url: string;
}

export const SnapshotListTable: FC<Props> = ({ url }) => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [removeSnapshot, setRemoveSnapshot] = useState<Snapshot | undefined>();

  const getSnapshots = useCallback(async () => {
    await getBackendSrv()
      .get('/api/dashboard/snapshots')
      .then((result: Snapshot[]) => {
        const absUrl = window.location.href;
        const baseUrl = absUrl.replace(url, '');
        const snapshots = result.map(snapshot => ({
          ...snapshot,
          url: snapshot.externalUrl || `${baseUrl}/dashboard/snapshot/${snapshot.key}`,
        }));
        setSnapshots(snapshots);
      });
  }, []);

  const doRemoveSnapshot = useCallback(
    async (snapshot: Snapshot) => {
      setSnapshots(snapshots.filter(ss => ss.key !== snapshot.key));
      await getBackendSrv()
        .delete(`/api/snapshots/${snapshot.key}`)
        .then(noop, () => {
          setSnapshots(snapshots.concat(snapshot));
        });
    },
    [snapshots]
  );

  useEffect(() => {
    getSnapshots();
  }, []);

  return (
    <div className="page-container page-body">
      <table className="filter-table">
        <thead>
          <tr>
            <th>
              <strong>名字</strong>
            </th>
            <th>
              <strong>快照地址</strong>
            </th>
            <th style={{ width: '70px' }}></th>
            <th style={{ width: '30px' }}></th>
            <th style={{ width: '25px' }}></th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((snapshot, key) => {
            return (
              <tr key={key}>
                <td>
                  <a href={snapshot.url}>{snapshot.name}</a>
                </td>
                <td>
                  <a href={snapshot.url}>{snapshot.url}</a>
                </td>
                <td>{snapshot.external && <span className="query-keyword">外部</span>}</td>
                <td className="text-center">
                  <LinkButton href={snapshot.url} variant="secondary" size="sm" icon="eye">
                    查看
                  </LinkButton>
                </td>
                <td className="text-right">
                  <Button variant="destructive" size="sm" icon="times" onClick={() => setRemoveSnapshot(snapshot)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={!!removeSnapshot}
        icon="trash-alt"
        title="删除"
        body={`你确定你要删除 '${removeSnapshot?.name}'?`}
        confirmText="删除"
        onDismiss={() => setRemoveSnapshot(undefined)}
        onConfirm={() => {
          doRemoveSnapshot(removeSnapshot!);
          setRemoveSnapshot(undefined);
        }}
      />
    </div>
  );
};
