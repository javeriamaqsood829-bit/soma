import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, handleFirestoreError, OperationType } from '../firebase/config';
import { useAuth } from './AuthContext';
import {
  SiteSettings,
  HeroData,
  AboutData,
  ServiceItem,
  ProcessStep,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  ProjectItem,
  ResultMetric,
  TestimonialItem,
  ContactMessage,
  MediaItem,
  SeoSettings,
} from '../types';
import {
  initialSiteSettings,
  initialHeroData,
  initialAboutData,
  initialServices,
  initialProcess,
  initialSkills,
  initialExperience,
  initialEducation,
  initialCertifications,
  initialProjects,
  initialResults,
  initialTestimonials,
  initialSeoSettings,
} from '../data/initialData';

interface PortfolioContextType {
  siteSettings: SiteSettings;
  hero: HeroData;
  about: AboutData;
  services: ServiceItem[];
  process: ProcessStep[];
  skills: SkillItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  results: ResultMetric[];
  testimonials: TestimonialItem[];
  messages: ContactMessage[];
  seo: SeoSettings;
  media: MediaItem[];
  loading: boolean;
  activeProjectModal: ProjectItem | null;
  setActiveProjectModal: (proj: ProjectItem | null) => void;

  // Actions
  updateSiteSettings: (data: Partial<SiteSettings>) => Promise<void>;
  updateHero: (data: Partial<HeroData>) => Promise<void>;
  updateAbout: (data: Partial<AboutData>) => Promise<void>;
  
  // Services
  saveService: (service: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  
  // Projects
  saveProject: (project: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;

  // Skills
  saveSkill: (skill: Partial<SkillItem>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;

  // Experience
  saveExperience: (exp: Partial<ExperienceItem>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;

  // Education
  saveEducation: (edu: Partial<EducationItem>) => Promise<void>;
  deleteEducation: (id: string) => Promise<void>;

  // Certifications
  saveCertification: (cert: Partial<CertificationItem>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;

  // Results
  saveResult: (result: Partial<ResultMetric>) => Promise<void>;
  deleteResult: (id: string) => Promise<void>;

  // Testimonials
  saveTestimonial: (testimonial: Partial<TestimonialItem>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Process
  saveProcessStep: (step: Partial<ProcessStep>) => Promise<void>;
  deleteProcessStep: (id: string) => Promise<void>;

  // SEO
  updateSeo: (data: Partial<SeoSettings>) => Promise<void>;

  // Messages
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Media
  uploadMediaFile: (file: File) => Promise<string>;
  deleteMedia: (id: string, fileUrl: string) => Promise<void>;

  // System
  seedDatabase: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [hero, setHero] = useState<HeroData>(initialHeroData);
  const [about, setAbout] = useState<AboutData>(initialAboutData);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [process, setProcess] = useState<ProcessStep[]>(initialProcess);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [experience, setExperience] = useState<ExperienceItem[]>(initialExperience);
  const [education, setEducation] = useState<EducationItem[]>(initialEducation);
  const [certifications, setCertifications] = useState<CertificationItem[]>(initialCertifications);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [results, setResults] = useState<ResultMetric[]>(initialResults);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [seo, setSeo] = useState<SeoSettings>(initialSeoSettings);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Load from Firestore with live real-time synchronization
  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    // 1. Site Settings
    try {
      const unsub = onSnapshot(
        doc(db, 'siteSettings', 'global'),
        (snapshot) => {
          if (snapshot.exists()) {
            setSiteSettings({ ...initialSiteSettings, ...snapshot.data() } as SiteSettings);
          }
        },
        (err) => {
          console.warn('SiteSettings snapshot listener error:', err.message);
        }
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to siteSettings:', e);
    }

    // 2. Hero
    try {
      const unsub = onSnapshot(
        doc(db, 'hero', 'main'),
        (snapshot) => {
          if (snapshot.exists()) {
            setHero({ ...initialHeroData, ...snapshot.data() } as HeroData);
          }
        },
        (err) => {
          console.warn('Hero snapshot listener error:', err.message);
        }
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to hero:', e);
    }

    // 3. About
    try {
      const unsub = onSnapshot(
        doc(db, 'about', 'main'),
        (snapshot) => {
          if (snapshot.exists()) {
            setAbout({ ...initialAboutData, ...snapshot.data() } as AboutData);
          }
        },
        (err) => {
          console.warn('About snapshot listener error:', err.message);
        }
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to about:', e);
    }

    // 4. Services
    try {
      const unsub = onSnapshot(
        collection(db, 'services'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ServiceItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ServiceItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setServices(list);
          }
        },
        (err) => console.warn('Services listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to services:', e);
    }

    // 5. Process
    try {
      const unsub = onSnapshot(
        collection(db, 'process'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ProcessStep[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ProcessStep));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setProcess(list);
          }
        },
        (err) => console.warn('Process listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to process:', e);
    }

    // 6. Skills
    try {
      const unsub = onSnapshot(
        collection(db, 'skills'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: SkillItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as SkillItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setSkills(list);
          }
        },
        (err) => console.warn('Skills listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to skills:', e);
    }

    // 7. Experience
    try {
      const unsub = onSnapshot(
        collection(db, 'experience'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ExperienceItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ExperienceItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setExperience(list);
          }
        },
        (err) => console.warn('Experience listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to experience:', e);
    }

    // 8. Education
    try {
      const unsub = onSnapshot(
        collection(db, 'education'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: EducationItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as EducationItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setEducation(list);
          }
        },
        (err) => console.warn('Education listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to education:', e);
    }

    // 9. Certifications
    try {
      const unsub = onSnapshot(
        collection(db, 'certifications'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: CertificationItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as CertificationItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setCertifications(list);
          }
        },
        (err) => console.warn('Certifications listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to certifications:', e);
    }

    // 10. Projects
    try {
      const unsub = onSnapshot(
        collection(db, 'projects'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ProjectItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ProjectItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setProjects(list);
          }
        },
        (err) => console.warn('Projects listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to projects:', e);
    }

    // 11. Results
    try {
      const unsub = onSnapshot(
        collection(db, 'results'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ResultMetric[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ResultMetric));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setResults(list);
          }
        },
        (err) => console.warn('Results listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to results:', e);
    }

    // 12. Testimonials
    try {
      const unsub = onSnapshot(
        collection(db, 'testimonials'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: TestimonialItem[] = [];
            snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as TestimonialItem));
            list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
            setTestimonials(list);
          }
        },
        (err) => console.warn('Testimonials listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to testimonials:', e);
    }

    // 14. Media Library
    try {
      const unsub = onSnapshot(
        collection(db, 'media'),
        (snapshot) => {
          const list: MediaItem[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as MediaItem));
          list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          setMedia(list);
        },
        (err) => console.warn('Media listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to media:', e);
    }

    // 15. SEO
    try {
      const unsub = onSnapshot(
        doc(db, 'seo', 'main'),
        (snapshot) => {
          if (snapshot.exists()) {
            setSeo({ ...initialSeoSettings, ...snapshot.data() } as SeoSettings);
          }
        },
        (err) => console.warn('SEO listener:', err.message)
      );
      unsubscribes.push(unsub);
    } catch (e) {
      console.warn('Error subscribing to seo:', e);
    }

    setLoading(false);
    return () => {
      unsubscribes.forEach((fn) => fn());
    };
  }, []);

  // 13. Messages (Contact Inbox) - Admin only listener
  useEffect(() => {
    if (!isAdmin) {
      setMessages([]);
      return;
    }
    try {
      const unsub = onSnapshot(
        collection(db, 'messages'),
        (snapshot) => {
          const list: ContactMessage[] = [];
          snapshot.forEach((d) => list.push({ id: d.id, ...d.data() } as ContactMessage));
          list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          setMessages(list);
        },
        (err) => {
          console.warn('Messages listener error:', err.message);
        }
      );
      return () => unsub();
    } catch (e) {
      console.warn('Error subscribing to messages:', e);
    }
  }, [isAdmin]);

  // Update Site Settings
  const updateSiteSettings = useCallback(async (data: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...data, updatedAt: new Date().toISOString() };
    setSiteSettings(updated);
    try {
      await setDoc(doc(db, 'siteSettings', 'global'), updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'siteSettings/global');
    }
  }, [siteSettings]);

  // Update Hero
  const updateHero = useCallback(async (data: Partial<HeroData>) => {
    const updated = { ...hero, ...data, updatedAt: new Date().toISOString() };
    setHero(updated);
    try {
      await setDoc(doc(db, 'hero', 'main'), updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'hero/main');
    }
  }, [hero]);

  // Update About
  const updateAbout = useCallback(async (data: Partial<AboutData>) => {
    const updated = { ...about, ...data, updatedAt: new Date().toISOString() };
    setAbout(updated);
    try {
      await setDoc(doc(db, 'about', 'main'), updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'about/main');
    }
  }, [about]);

  // Services CRUD
  const saveService = useCallback(async (item: Partial<ServiceItem>) => {
    const id = item.id || `srv-${Date.now()}`;
    const slug = item.slug || (item.title || 'service').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload: ServiceItem = {
      id,
      title: item.title || 'New Service',
      slug,
      shortDescription: item.shortDescription || '',
      fullDescription: item.fullDescription || '',
      icon: item.icon || 'Sparkles',
      features: item.features || [],
      displayOrder: item.displayOrder ?? services.length + 1,
      published: item.published ?? true,
      updatedAt: new Date().toISOString(),
    };

    setServices((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'services', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `services/${id}`);
    }
  }, [services.length]);

  const deleteService = useCallback(async (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  }, []);

  // Projects CRUD
  const saveProject = useCallback(async (item: Partial<ProjectItem>) => {
    const id = item.id || `proj-${Date.now()}`;
    const slug = item.slug || (item.title || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload: ProjectItem = {
      id,
      title: item.title || 'Untitled Project',
      slug,
      category: item.category || 'Other',
      client: item.client || '',
      date: item.date || new Date().getFullYear().toString(),
      shortDescription: item.shortDescription || '',
      fullDescription: item.fullDescription || '',
      challenge: item.challenge || '',
      strategy: item.strategy || '',
      solution: item.solution || '',
      results: item.results || '',
      metrics: item.metrics || [],
      services: item.services || [],
      tools: item.tools || [],
      coverImage: item.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      gallery: item.gallery || [],
      projectUrl: item.projectUrl || '',
      caseStudyUrl: item.caseStudyUrl || '',
      featured: item.featured ?? false,
      published: item.published ?? true,
      displayOrder: item.displayOrder ?? projects.length + 1,
      updatedAt: new Date().toISOString(),
    };

    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'projects', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${id}`);
    }
  }, [projects.length]);

  const deleteProject = useCallback(async (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  }, []);

  // Skills CRUD
  const saveSkill = useCallback(async (item: Partial<SkillItem>) => {
    const id = item.id || `sk-${Date.now()}`;
    const payload: SkillItem = {
      id,
      name: item.name || 'New Skill',
      category: item.category || 'marketing',
      percentage: item.percentage ?? 80,
      icon: item.icon || 'Sparkles',
      displayOrder: item.displayOrder ?? skills.length + 1,
      published: item.published ?? true,
    };

    setSkills((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'skills', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `skills/${id}`);
    }
  }, [skills.length]);

  const deleteSkill = useCallback(async (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    try {
      await deleteDoc(doc(db, 'skills', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `skills/${id}`);
    }
  }, []);

  // Experience CRUD
  const saveExperience = useCallback(async (item: Partial<ExperienceItem>) => {
    const id = item.id || `exp-${Date.now()}`;
    const payload: ExperienceItem = {
      id,
      company: item.company || 'Company',
      position: item.position || 'Digital Marketer',
      employmentType: item.employmentType || 'Full-time',
      startDate: item.startDate || '2023',
      endDate: item.endDate || 'Present',
      location: item.location || 'Remote',
      description: item.description || '',
      responsibilities: item.responsibilities || [],
      achievements: item.achievements || [],
      tools: item.tools || [],
      logoUrl: item.logoUrl || '',
      displayOrder: item.displayOrder ?? experience.length + 1,
      published: item.published ?? true,
    };

    setExperience((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'experience', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `experience/${id}`);
    }
  }, [experience.length]);

  const deleteExperience = useCallback(async (id: string) => {
    setExperience((prev) => prev.filter((e) => e.id !== id));
    try {
      await deleteDoc(doc(db, 'experience', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `experience/${id}`);
    }
  }, []);

  // Education CRUD
  const saveEducation = useCallback(async (item: Partial<EducationItem>) => {
    const id = item.id || `edu-${Date.now()}`;
    const payload: EducationItem = {
      id,
      degree: item.degree || 'Degree',
      institution: item.institution || 'University',
      startYear: item.startYear || '2016',
      endYear: item.endYear || '2020',
      description: item.description || '',
      displayOrder: item.displayOrder ?? education.length + 1,
    };

    setEducation((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'education', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `education/${id}`);
    }
  }, [education.length]);

  const deleteEducation = useCallback(async (id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
    try {
      await deleteDoc(doc(db, 'education', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `education/${id}`);
    }
  }, []);

  // Certifications CRUD
  const saveCertification = useCallback(async (item: Partial<CertificationItem>) => {
    const id = item.id || `cert-${Date.now()}`;
    const payload: CertificationItem = {
      id,
      name: item.name || 'Certification',
      issuer: item.issuer || 'Issuing Authority',
      date: item.date || '2024',
      credentialId: item.credentialId || '',
      certificateUrl: item.certificateUrl || '',
      certificateImage: item.certificateImage || '',
      displayOrder: item.displayOrder ?? certifications.length + 1,
    };

    setCertifications((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'certifications', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `certifications/${id}`);
    }
  }, [certifications.length]);

  const deleteCertification = useCallback(async (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));
    try {
      await deleteDoc(doc(db, 'certifications', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `certifications/${id}`);
    }
  }, []);

  // Results CRUD
  const saveResult = useCallback(async (item: Partial<ResultMetric>) => {
    const id = item.id || `res-${Date.now()}`;
    const payload: ResultMetric = {
      id,
      number: item.number || '100',
      prefix: item.prefix || '',
      suffix: item.suffix || '%',
      label: item.label || 'Growth Metric',
      description: item.description || '',
      icon: item.icon || 'TrendingUp',
      displayOrder: item.displayOrder ?? results.length + 1,
    };

    setResults((prev) => {
      const idx = prev.findIndex((r) => r.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'results', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `results/${id}`);
    }
  }, [results.length]);

  const deleteResult = useCallback(async (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
    try {
      await deleteDoc(doc(db, 'results', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `results/${id}`);
    }
  }, []);

  // Testimonials CRUD
  const saveTestimonial = useCallback(async (item: Partial<TestimonialItem>) => {
    const id = item.id || `test-${Date.now()}`;
    const payload: TestimonialItem = {
      id,
      clientName: item.clientName || 'Client Name',
      clientPosition: item.clientPosition || 'Executive',
      company: item.company || 'Company',
      avatarUrl: item.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      rating: item.rating ?? 5,
      quote: item.quote || '',
      date: item.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      featured: item.featured ?? false,
      published: item.published ?? true,
      displayOrder: item.displayOrder ?? testimonials.length + 1,
    };

    setTestimonials((prev) => {
      const idx = prev.findIndex((t) => t.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'testimonials', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `testimonials/${id}`);
    }
  }, [testimonials.length]);

  const deleteTestimonial = useCallback(async (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
    }
  }, []);

  // Process CRUD
  const saveProcessStep = useCallback(async (item: Partial<ProcessStep>) => {
    const id = item.id || `proc-${Date.now()}`;
    const payload: ProcessStep = {
      id,
      stepNumber: item.stepNumber || '01',
      title: item.title || 'Step',
      description: item.description || '',
      displayOrder: item.displayOrder ?? process.length + 1,
    };

    setProcess((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = payload;
        return next;
      }
      return [...prev, payload];
    });

    try {
      await setDoc(doc(db, 'process', id), payload, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `process/${id}`);
    }
  }, [process.length]);

  const deleteProcessStep = useCallback(async (id: string) => {
    setProcess((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteDoc(doc(db, 'process', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `process/${id}`);
    }
  }, []);

  // SEO Update
  const updateSeo = useCallback(async (data: Partial<SeoSettings>) => {
    const updated = { ...seo, ...data };
    setSeo(updated);
    try {
      await setDoc(doc(db, 'seo', 'main'), updated, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seo/main');
    }
  }, [seo]);

  // Submit Contact Message (Public)
  const submitContactMessage = useCallback(async (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const id = `msg-${Date.now()}`;
    const payload: ContactMessage = {
      ...msg,
      id,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'messages', id), payload);
      setMessages((prev) => [payload, ...prev]);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `messages/${id}`);
    }
  }, []);

  // Message status update (Admin)
  const updateMessageStatus = useCallback(async (id: string, status: ContactMessage['status']) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    try {
      await setDoc(doc(db, 'messages', id), { status }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `messages/${id}`);
    }
  }, []);

  const deleteMessage = useCallback(async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  }, []);

  // Upload Media File
  const uploadMediaFile = useCallback(async (file: File): Promise<string> => {
    const id = `media-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    let fileUrl = '';

    try {
      const storageRef = ref(storage, `portfolio-media/${id}`);
      const uploadResult = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(uploadResult.ref);
    } catch (storageErr) {
      console.warn('Firebase Storage upload failed, creating optimized Data URI fallback:', storageErr);
      // Data URI fallback
      fileUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const mediaDoc: MediaItem = {
      id,
      fileName: file.name,
      fileType: file.type,
      url: fileUrl,
      size: file.size,
      createdAt: new Date().toISOString(),
    };

    setMedia((prev) => [mediaDoc, ...prev]);
    try {
      await setDoc(doc(db, 'media', id), mediaDoc);
    } catch (e) {
      console.warn('Failed to record media entry in Firestore:', e);
    }

    return fileUrl;
  }, []);

  const deleteMedia = useCallback(async (id: string, fileUrl: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    try {
      await deleteDoc(doc(db, 'media', id));
      if (fileUrl.includes('firebasestorage.app')) {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);
      }
    } catch (e) {
      console.warn('Error deleting media:', e);
    }
  }, []);

  // Seed Database with Master Template
  const seedDatabase = useCallback(async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'siteSettings', 'global'), initialSiteSettings);
      await setDoc(doc(db, 'hero', 'main'), initialHeroData);
      await setDoc(doc(db, 'about', 'main'), initialAboutData);
      await setDoc(doc(db, 'seo', 'main'), initialSeoSettings);

      for (const s of initialServices) {
        await setDoc(doc(db, 'services', s.id), s);
      }
      for (const p of initialProcess) {
        await setDoc(doc(db, 'process', p.id), p);
      }
      for (const sk of initialSkills) {
        await setDoc(doc(db, 'skills', sk.id), sk);
      }
      for (const ex of initialExperience) {
        await setDoc(doc(db, 'experience', ex.id), ex);
      }
      for (const ed of initialEducation) {
        await setDoc(doc(db, 'education', ed.id), ed);
      }
      for (const c of initialCertifications) {
        await setDoc(doc(db, 'certifications', c.id), c);
      }
      for (const pr of initialProjects) {
        await setDoc(doc(db, 'projects', pr.id), pr);
      }
      for (const r of initialResults) {
        await setDoc(doc(db, 'results', r.id), r);
      }
      for (const t of initialTestimonials) {
        await setDoc(doc(db, 'testimonials', t.id), t);
      }

      setSiteSettings(initialSiteSettings);
      setHero(initialHeroData);
      setAbout(initialAboutData);
      setServices(initialServices);
      setProcess(initialProcess);
      setSkills(initialSkills);
      setExperience(initialExperience);
      setEducation(initialEducation);
      setCertifications(initialCertifications);
      setProjects(initialProjects);
      setResults(initialResults);
      setTestimonials(initialTestimonials);
      setSeo(initialSeoSettings);
    } catch (error) {
      console.error('Seed Database Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        siteSettings,
        hero,
        about,
        services,
        process,
        skills,
        experience,
        education,
        certifications,
        projects,
        results,
        testimonials,
        messages,
        seo,
        media,
        loading,
        activeProjectModal,
        setActiveProjectModal,
        updateSiteSettings,
        updateHero,
        updateAbout,
        saveService,
        deleteService,
        saveProject,
        deleteProject,
        saveSkill,
        deleteSkill,
        saveExperience,
        deleteExperience,
        saveEducation,
        deleteEducation,
        saveCertification,
        deleteCertification,
        saveResult,
        deleteResult,
        saveTestimonial,
        deleteTestimonial,
        saveProcessStep,
        deleteProcessStep,
        updateSeo,
        submitContactMessage,
        updateMessageStatus,
        deleteMessage,
        uploadMediaFile,
        deleteMedia,
        seedDatabase,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
