"use client";

import { useEffect, useState } from "react";
import {
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off,
  DataSnapshot,
} from "firebase/database";
import { rtDb } from "@/lib/firebaseClient";
import { TaskType } from "@/types/scheduleType";

export function useRealtimeTask(teamId: string) {
  const [tasksMap, setTasksMap] = useState<Record<string, TaskType>>({});

  useEffect(() => {
    if (!teamId) return;

    const path = `teams/${teamId}/tasks`;
    const tasksRef = ref(rtDb, path);

    const handleAdd = (snap: DataSnapshot) => {
      setTasksMap((prev) => ({
        ...prev,
        [snap.key!]: snap.val() as TaskType,
      }));
    };
    const handleChange = (snap: DataSnapshot) => {
      setTasksMap((prev) => ({
        ...prev,
        [snap.key!]: snap.val() as TaskType,
      }));
    };
    const handleRemove = (snap: DataSnapshot) => {
      setTasksMap((prev) => {
        const next = { ...prev };
        delete next[snap.key!];
        return next;
      });
    };

    onChildAdded(tasksRef, handleAdd);
    onChildChanged(tasksRef, handleChange);
    onChildRemoved(tasksRef, handleRemove);

    return () => {
      off(tasksRef, "child_added", handleAdd);
      off(tasksRef, "child_changed", handleChange);
      off(tasksRef, "child_removed", handleRemove);
    };
  }, [teamId]);

  return Object.values(tasksMap);
}
