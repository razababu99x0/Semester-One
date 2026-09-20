import React from "react";
import {
  ArrowLeft, Plus, Search, Tag, Trash2, Pin, PinOff, Printer, NotebookPen, Save, X, Link2,
} from "lucide-react";
import { pagesDB, notesDB, type PageRecord } from "@/services/db";
import { useBook } from "@/stores/useBook";
import { CHAPTERS } from "@/data";
import { exportNotebook } from "@/services/exporters";

const COLOURS = [
  { id: "cream", label: "Parchment", bg: "#fbf6e8", line: "#d8cfb4" },
  { id: "sky", label: "Sky", bg: "#eef6fd", line: "#c0d8ef" },
  { id: "mint", label: "Mint", bg: "#edf8f2", line: "#bfe3d2" },
  { id: "rose", label: "Rose", bg: "#fdf0f1", line: "#eecdd2" },
  { id: "violet", label: "Violet", bg: "#f4f0fd", line: "#d6ccf0" },
];
const colourOf = (id: string) => COLOURS.find((c) => c.id === id) ?? COLOURS[0];

const uid = () => `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** A single ruled note page with a margin line and a punched-hole spine. */
const Page: React.FC<{
  page: PageRecord;
  onChange: (p: PageRecord) => void;
  onDelete: (id: string) => void;
  topicName?: string;
  onOpenTopic?: () => void;
}> = ({ page, onChange, onDelete, topicName, onOpenTopic }) => {
  const c = colourOf(page.colour);
  const [tagInput, setTagInput] = React.useState("");

  return (
    <article
      className="relative rounded-xl overflow-hidden shadow-lg"
      style={{
        background: c.bg,
        color: "#22212a",
        border: `1px solid ${c.line}`,
        backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${c.line}88 27px, ${c.line}88 28px)`,
        backgroundPosition: "0 58px",
      }}
    >
      {/* spine holes */}
      <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-6" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="block h-3 w-3 rounded-full" style={{ background: "rgba(0,0,0,0.10)" }} />
        ))}
      </div>
      {/* margin rule */}
      <div className="absolute top-0 bottom-0" style={{ left: 40, width: 1, background: "rgba(200,60,60,0.35)" }} aria-hidden />

      <div className="pl-14 pr-4 py-4">
        <div className="flex items-start gap-2">
          <input
            value={page.title}
            onChange={(e) => onChange({ ...page, title: e.target.value, updated: Date.now() })}
            placeholder="Untitled note"
            aria-label="Note title"
            className="flex-1 bg-transparent text-lg font-bold serif outline-none border-b border-transparent focus:border-black/30"
            style={{ minHeight: 34 }}
          />
          <button
            className="btn btn-ink px-2"
            onClick={() => onChange({ ...page, pinned: !page.pinned, updated: Date.now() })}
            aria-label={page.pinned ? "Unpin note" : "Pin note"}
            title={page.pinned ? "Unpin" : "Pin to top"}
          >
            {page.pinned ? <Pin size={15} /> : <PinOff size={15} />}
          </button>
          <button className="btn btn-ink px-2" onClick={() => onDelete(page.id)} aria-label="Delete note">
            <Trash2 size={15} />
          </button>
        </div>

        {topicName && (
          <button className="mt-1 inline-flex items-center gap-1 text-[0.75rem] underline" onClick={onOpenTopic}>
            <Link2 size={12} /> linked to {topicName}
          </button>
        )}

        <textarea
          value={page.body}
          onChange={(e) => onChange({ ...page, body: e.target.value, updated: Date.now() })}
          placeholder="Write anything: a derivation you keep forgetting, a doubt for your teacher, a trick that finally made it click…"
          aria-label="Note body"
          rows={Math.max(6, Math.min(24, page.body.split("\n").length + 2))}
          className="mt-3 w-full resize-none bg-transparent outline-none text-[0.95rem]"
          style={{ lineHeight: "28px", fontFamily: "var(--serif)" }}
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {page.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[0.72rem] font-semibold" style={{ background: "rgba(0,0,0,0.07)" }}>
              <Tag size={11} /> {t}
              <button
                onClick={() => onChange({ ...page, tags: page.tags.filter((x) => x !== t), updated: Date.now() })}
                aria-label={`Remove tag ${t}`}
                className="ml-1"
              >
                <X size={11} />
              </button>
            </span>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tagInput.trim()) {
                onChange({ ...page, tags: [...new Set([...page.tags, tagInput.trim()])], updated: Date.now() });
                setTagInput("");
              }
            }}
            placeholder="+ tag"
            aria-label="Add a tag"
            className="w-20 bg-transparent text-[0.75rem] outline-none border-b border-black/20"
          />
          <span className="ml-auto flex items-center gap-1">
            {COLOURS.map((col) => (
              <button
                key={col.id}
                onClick={() => onChange({ ...page, colour: col.id, updated: Date.now() })}
                aria-label={`${col.label} paper`}
                title={col.label}
                className="h-5 w-5 rounded-full border"
                style={{ background: col.bg, borderColor: page.colour === col.id ? "#333" : col.line }}
              />
            ))}
          </span>
        </div>

        <p className="mt-2 text-[0.7rem]" style={{ color: "rgba(0,0,0,0.5)" }}>
          Saved automatically · last edited {new Date(page.updated).toLocaleString()}
        </p>
      </div>
    </article>
  );
};

export const Notebook: React.FC = () => {
  const { go, openTopic } = useBook();
  const [pages, setPages] = React.useState<PageRecord[]>([]);
  const [topicNotes, setTopicNotes] = React.useState<{ id: string; text: string }[]>([]);
  const [q, setQ] = React.useState("");
  const [tagFilter, setTagFilter] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState("");
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    pagesDB.all().then((p) => setPages(p.sort((a, b) => b.updated - a.updated)));
    notesDB.all().then((n) => setTopicNotes(n.filter((x) => x.text.trim()).map((x) => ({ id: x.id, text: x.text }))));
  }, []);

  const save = (p: PageRecord) => {
    setPages((all) => all.map((x) => (x.id === p.id ? p : x)));
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      await pagesDB.put(p);
      setStatus(`Saved ${new Date().toLocaleTimeString()}`);
    }, 400);
  };

  const add = async (topicId?: string, chapterId?: string, title?: string) => {
    const p: PageRecord = {
      id: uid(),
      title: title ?? "",
      body: "",
      tags: [],
      colour: COLOURS[pages.length % COLOURS.length].id,
      topicId,
      chapterId,
      created: Date.now(),
      updated: Date.now(),
    };
    await pagesDB.put(p);
    setPages((all) => [p, ...all]);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this note page permanently?")) return;
    await pagesDB.del(id);
    setPages((all) => all.filter((p) => p.id !== id));
  };

  const allTags = [...new Set(pages.flatMap((p) => p.tags))].sort();
  const topicOf = (id?: string) => CHAPTERS.flatMap((c) => c.topics).find((t) => t.id === id);
  const chapterOf = (id?: string) => CHAPTERS.find((c) => c.topics.some((t) => t.id === id));

  const visible = pages
    .filter((p) => !tagFilter || p.tags.includes(tagFilter))
    .filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.body.toLowerCase().includes(q.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())),
    )
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.updated - a.updated);

  return (
    <main id="main" className="min-h-screen px-4 py-6" style={{ background: "radial-gradient(120% 80% at 50% 0%, var(--bg-2), var(--bg) 65%)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <button className="btn btn-ghost" onClick={() => go("library")}>
            <ArrowLeft size={16} /> Library
          </button>
          <h1 className="serif text-2xl sm:text-3xl font-bold inline-flex items-center gap-2">
            <NotebookPen size={24} /> My Notebook
          </h1>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={() => add()}>
              <Plus size={16} /> New page
            </button>
            <button className="btn" onClick={() => exportNotebook()}>
              <Printer size={16} /> Print / PDF
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Everything here is stored on this device only, inside your browser's database. It survives
          refreshes, works with no internet, and never leaves your machine.
          {status && <span className="ml-2 inline-flex items-center gap-1" style={{ color: "var(--accent-2)" }}><Save size={12} /> {status}</span>}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search your notes…"
              aria-label="Search notes"
              className="w-full rounded-lg border pl-9 pr-3"
              style={{ background: "var(--bg)", borderColor: "var(--line)", color: "var(--fg)", minHeight: 44 }}
            />
          </label>
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <button className="btn btn-ghost text-xs" onClick={() => setTagFilter(null)} aria-pressed={!tagFilter}>
                All
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  className="btn btn-ghost text-xs"
                  style={tagFilter === t ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined}
                  onClick={() => setTagFilter(t === tagFilter ? null : t)}
                  aria-pressed={tagFilter === t}
                >
                  <Tag size={12} /> {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {visible.length === 0 && (
          <div className="panel mt-6 p-6 text-center">
            <NotebookPen size={30} className="mx-auto mb-2" style={{ color: "var(--accent)" }} />
            <p className="font-semibold">Your notebook is empty</p>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Create a page for a derivation you keep forgetting, a doubt to ask your teacher, or a
              summary in your own words. You can also start a page straight from any topic.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button className="btn btn-primary" onClick={() => add(undefined, undefined, "Doubts to ask my teacher")}>
                <Plus size={16} /> Doubts page
              </button>
              <button className="btn" onClick={() => add(undefined, undefined, "Formulas I keep forgetting")}>
                <Plus size={16} /> Formula page
              </button>
              <button className="btn" onClick={() => add(undefined, undefined, "Revision plan")}>
                <Plus size={16} /> Revision plan
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {visible.map((p) => (
            <Page
              key={p.id}
              page={p}
              onChange={save}
              onDelete={remove}
              topicName={topicOf(p.topicId)?.title}
              onOpenTopic={() => {
                const c = chapterOf(p.topicId);
                if (c && p.topicId) openTopic(c.id, p.topicId);
              }}
            />
          ))}
        </div>

        {topicNotes.length > 0 && (
          <section className="mt-10">
            <h2 className="serif text-xl font-bold">Notes attached to topics</h2>
            <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
              These were written in Section 11 of each topic page.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {topicNotes.map((n) => (
                <button
                  key={n.id}
                  className="panel p-3 text-left"
                  onClick={() => {
                    const c = chapterOf(n.id);
                    if (c) openTopic(c.id, n.id);
                  }}
                >
                  <p className="font-semibold text-sm">{topicOf(n.id)?.title ?? n.id}</p>
                  <p className="mt-1 text-sm line-clamp-3" style={{ color: "var(--muted)" }}>{n.text}</p>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Notebook;
