import { atomWithSyncStorage } from '@affine/jotai';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import {
  currentPageIdAtom,
  currentWorkspaceIdAtom,
  workspacesAtom,
} from '../../atoms';
import type { AllWorkspace } from '../../shared';

export const currentWorkspaceAtom = atom<Promise<AllWorkspace | null>>(
  async get => {
    const id = get(currentWorkspaceIdAtom);
    const workspaces = await get(workspacesAtom);
    return workspaces.find(workspace => workspace.id === id) ?? null;
  }
);

export const lastWorkspaceIdAtom = atomWithSyncStorage<string | null>(
  'last_workspace_id',
  null
);

export function useCurrentWorkspace(): [
  AllWorkspace | null,
  (id: string | null) => void
] {
  const currentWorkspace = useAtomValue(currentWorkspaceAtom);
  const [, setId] = useAtom(currentWorkspaceIdAtom);
  const [, setPageId] = useAtom(currentPageIdAtom);
  const setLast = useSetAtom(lastWorkspaceIdAtom);
  return [
    currentWorkspace,
    useCallback(
      (id: string | null) => {
        setPageId(null);
        setLast(id);
        setId(id);
      },
      [setId, setLast, setPageId]
    ),
  ];
}
