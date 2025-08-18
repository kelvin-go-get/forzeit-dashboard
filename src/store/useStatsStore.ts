import { defineStore } from "pinia";
import dayjs from "dayjs";

type Event = { type: "login" | "card_created"; at: number };

export const useStatsStore = defineStore("stats", {
  state: () => ({
    events: [] as Event[],
    usersOnline: new Set<number>(),
    timer: 0 as number | undefined,
  }),
  getters: {
    activeLast5s(state): number {
      const now = Date.now();
      const cutoff = now - 5000;
      // count unique users seen in last 5 seconds
      const seen = new Set<number>();
      for (let i = state.events.length - 1; i >= 0; i--) {
        const e = state.events[i];
        if (!e) continue;
        if (e.at < cutoff) break;
        if (e.type === "login") seen.add(i % 200); // pseudo user id
      }
      return seen.size;
    },
    usersLast24h(state): number {
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      const seen = new Set<number>();
      for (let i = state.events.length - 1; i >= 0; i--) {
        const e = state.events[i];
        if (!e) continue;
        if (e.at < cutoff) break;
        if (e.type === "login") seen.add(i % 5000);
      }
      return seen.size;
    },
    cardsLast24h(state): number {
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      let count = 0;
      for (let i = state.events.length - 1; i >= 0; i--) {
        const e = state.events[i];
        if (!e) continue;
        if (e.at < cutoff) break;
        if (e.type === "card_created") count++;
      }
      return count;
    },
    chartSeries(state): { t: string; v: number }[] {
      // Precompute 24h buckets with zero
      const buckets: number[] = Array(24).fill(0);
      const labels: string[] = [];

      const now = dayjs();
      for (let h = 23; h >= 0; h--) {
        const hour = now.subtract(h, "hour").startOf("hour");
        labels.push(hour.format("HH:00"));
      }

      // Only iterate once over events in last 24h
      const since = now.subtract(24, "hour").valueOf();
      state.events.forEach((e) => {
        if (e.type !== "login" || e.at < since) return;
        const diff = now.diff(dayjs(e.at), "hour");
        const idx = 23 - diff; // map to 0..23
        if (idx >= 0 && idx < 24 && typeof buckets[idx] === "number")
          buckets[idx]++;
      });

      return labels.map((t, i) => ({ t, v: buckets[i] ?? 0 }));
    },
  },
  actions: {
    start() {
      if (this.timer) return;
      // seed
      const now = Date.now();
      for (let i = 0; i < 5000; i++) {
        const at = now - Math.floor(Math.random() * 24 * 60 * 60 * 1000);
        this.events.push({
          type: Math.random() < 0.7 ? "login" : "card_created",
          at,
        });
      }
      // live tick
      this.timer = setInterval(() => {
        const now = Date.now();
        // Simulate some logins
        const bursts = 5 + Math.floor(Math.random() * 10);
        for (let i = 0; i < bursts; i++) {
          this.events.push({
            type: "login",
            at: now - Math.floor(Math.random() * 3000),
          });
        }
        // Simulate cards
        if (Math.random() < 0.4) {
          this.events.push({ type: "card_created", at: now });
        }
        // trim
        const cutoff = now - 24 * 60 * 60 * 1000;
        if (this.events.length > 15000) {
          this.events = this.events.filter((e) => e.at >= cutoff);
        }
      }, 1000) as unknown as number;
    },
  },
});
