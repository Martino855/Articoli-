export interface IPost {
  id: number;
  date?: string;
  date_gmt?: string;
  guid?: Guid;
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  type?: string;
  link?: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt?: Excerpt;
  author?: number;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  sticky?: boolean;
  template?: string;
  format?: string;
  meta?: Meta;
  categories?: number[];
  tags?: any[];
  _links?: Links;
}
export class Post {
  id: number;
  title: string;
  content: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  constructor(p: IPost) {
    this.id = p.id;
    this.title = p.title.rendered;
    this.content = p.content.rendered;
    this.status = p.status;
  }
}

export interface Guid {
  rendered: string;
}


export interface Excerpt {
  rendered: string;
  protected: boolean;
}

export interface Meta {
  neve_meta_sidebar: string;
  neve_meta_container: string;
  neve_meta_enable_content_width: string;
  neve_meta_content_width: number;
  neve_meta_title_alignment: string;
  neve_meta_author_avatar: string;
  neve_post_elements_order: string;
  neve_meta_disable_header: string;
  neve_meta_disable_footer: string;
  neve_meta_disable_title: string;
  _themeisle_gutenberg_block_has_review: boolean;
  footnotes: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  replies: Reply[];
  'version-history': VersionHistory[];
  'wp:featuredmedia': Featuredmedum[];
  'wp:attachment': WpAttachment[];
  'wp:term': WpTerm[];
  curies: Cury[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface Reply {
  embeddable: boolean;
  href: string;
}

export interface VersionHistory {
  count: number;
  href: string;
}

export interface Featuredmedum {
  embeddable: boolean;
  href: string;
}

export interface WpAttachment {
  href: string;
}

export interface WpTerm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}
